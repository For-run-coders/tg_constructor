package tg.constructor.schemamanager.config;

import lombok.extern.slf4j.Slf4j;
import org.flywaydb.core.Flyway;

import java.sql.SQLException;

@Slf4j
public class FlywayConfig {
    public void migrate() throws SQLException {
//        PGSimpleDataSource dataSource = new PGSimpleDataSource();
//        System.out.println(pgHost);
//        dataSource.setServerName(pgHost);
//        dataSource.setDatabaseName("postgres");
//        dataSource.setUser("postgres");
//        dataSource.setPassword("password");
//        log.info(dataSource.getUser());
//        log.info(dataSource.getPassword());
//        log.info(dataSource.getServerName());
//
//        Connection con = dataSource.getConnection();

        String pgHost = System.getenv("PG_HOST");
        Flyway flyway = Flyway.configure()
                .dataSource(String.format("jdbc:postgresql://%s/postgres", pgHost), "postgres", "password")
                .locations("db/migrations")
                .defaultSchema("bot")
                .load();
        flyway.migrate();
    }
}
