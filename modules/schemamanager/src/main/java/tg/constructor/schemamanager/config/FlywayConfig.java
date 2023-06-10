package tg.constructor.schemamanager.config;

import lombok.extern.slf4j.Slf4j;
import org.flywaydb.core.Flyway;

@Slf4j
public class FlywayConfig {
    public void migrate() {
        String pgHost = System.getenv("PG_HOST");
        Flyway flyway = Flyway.configure()
                .dataSource(String.format("jdbc:postgresql://%s/postgres", pgHost), "postgres", "password")
                .locations("db/migrations")
                .defaultSchema("bot")
                .load();
        flyway.migrate();
    }
}
