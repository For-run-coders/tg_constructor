package tg.constructor.schemamanager;

import lombok.extern.slf4j.Slf4j;
import tg.constructor.schemamanager.config.FlywayConfig;

@Slf4j
public class Main {
    public static void main(String[] args) {
        var flywayConfig = new FlywayConfig();
        flywayConfig.migrate();
    }
}
