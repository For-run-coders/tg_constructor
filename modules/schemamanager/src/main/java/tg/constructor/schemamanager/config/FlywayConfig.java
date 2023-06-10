package tg.constructor.schemamanager.config;

import lombok.extern.slf4j.Slf4j;
import org.flywaydb.core.Flyway;

import java.sql.SQLException;

@Slf4j
public class FlywayConfig {
    public void migrate() {
        String pgHost = System.getenv("PG_HOST");
        String user = System.getenv("DB_USERNAME");
        String password = System.getenv("DB_PASSWORD");
        log.info("Database host: {}", pgHost);
        Flyway flyway = Flyway.configure()
                .dataSource(String.format("jdbc:postgresql://%s/postgres", pgHost), user, password)
                .locations("db/migrations")
                .defaultSchema("bot")
                .load();
        log.info("Running flyway migrations");
        flyway.migrate();
        try {
            flyway.getConfiguration().getDataSource().getConnection().close();
        } catch (SQLException exception) {
            log.info("Could not close DB connection");
            System.exit(0);
        }
    }
}
