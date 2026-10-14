package in.learner.BillingSoftware.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.net.URI;

@Slf4j
@Configuration
public class DatabaseConfig {

    @Value("${spring.datasource.url}")
    private String rawUrl;

    @Value("${spring.datasource.username:}")
    private String username;

    @Value("${spring.datasource.password:}")
    private String password;

    @Value("${spring.datasource.driver-class-name:org.postgresql.Driver}")
    private String driverClassName;

    @Bean
    @Primary
    public DataSource dataSource() {
        String cleanUrl = rawUrl != null ? rawUrl.trim() : "";
        String finalUsername = (username != null && !username.isBlank()) ? username.trim() : null;
        String finalPassword = (password != null && !password.isBlank()) ? password.trim() : null;

        // Auto-sanitize Render / Heroku URLs containing username:password@host
        // e.g. jdbc:postgresql://user:pass@host/db or postgres://user:pass@host/db
        try {
            String uriString = cleanUrl;
            if (uriString.startsWith("jdbc:")) {
                uriString = uriString.substring(5);
            }
            if (uriString.startsWith("postgres://")) {
                uriString = "postgresql://" + uriString.substring("postgres://".length());
            }

            if (uriString.contains("@")) {
                URI uri = URI.create(uriString);
                String userInfo = uri.getUserInfo();
                if (userInfo != null && !userInfo.isEmpty()) {
                    String[] parts = userInfo.split(":", 2);
                    if (parts[0] != null && !parts[0].isBlank()) {
                        finalUsername = parts[0];
                    }
                    if (parts.length > 1 && parts[1] != null && !parts[1].isBlank()) {
                        finalPassword = parts[1];
                    }
                }

                String host = uri.getHost();
                int port = uri.getPort() > 0 ? uri.getPort() : 5432;
                String path = uri.getPath() != null ? uri.getPath() : "";

                cleanUrl = "jdbc:postgresql://" + host + ":" + port + path;
                if (uri.getQuery() != null && !uri.getQuery().isBlank()) {
                    cleanUrl += "?" + uri.getQuery();
                }
                log.info("Sanitized Render database URL to standard JDBC format: {}", cleanUrl);
            } else if (!cleanUrl.startsWith("jdbc:")) {
                cleanUrl = "jdbc:" + cleanUrl;
            }
        } catch (Exception e) {
            log.warn("Could not auto-format database URI, falling back to raw URL: {}", e.getMessage());
        }

        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(cleanUrl);
        if (finalUsername != null) {
            config.setUsername(finalUsername);
        }
        if (finalPassword != null) {
            config.setPassword(finalPassword);
        }
        config.setDriverClassName(driverClassName);

        return new HikariDataSource(config);
    }
}
