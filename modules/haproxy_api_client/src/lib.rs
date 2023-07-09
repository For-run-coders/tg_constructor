use serde::Deserialize;
use std::{collections::HashMap, env};

pub struct Config {
    pub service_address: String,
}

impl Config {
    pub fn build() -> Result<Config, &'static str> {
        let args: Vec<String> = env::args().collect();
        println!("args: {:?}", args);
        let address = env::var("SERVICE_ADDRESS").expect("SERVICE_ADDRESS must be set");
        println!("address: {}", address);
        Ok(Config {
            service_address: address,
        })
    }

    pub fn api_address(&self, path: &str) -> String {
        let f = format!("{}{}", self.service_address, path);
        println!("f: {}", f);
        f
    }
}

pub struct Client {
    pub config: Config,
    pub client: reqwest::blocking::Client,
}

#[derive(Deserialize)]
pub struct CommitResponse {
    pub id: String,
    pub status: String,
}

impl Client {
    pub fn start_transaction(&self, version: &String) -> Result<String, reqwest::Error> {
        let response = self
            .client
            .post(self.config.api_address(&format!(
                "/services/haproxy/transactions?version={}",
                version
            )))
            .send()?
            .json::<HashMap<String, String>>()?;
        Ok(response.get("id").unwrap().to_string())
    }

    pub fn commit_transaction(&self, version: &String) -> Result<CommitResponse, reqwest::Error> {
        let response: CommitResponse = self
            .client
            .put(
                self.config
                    .api_address(&format!("/services/haproxy/transactions/{}", version)),
            )
            .send()?
            .json()?;
        Ok(response)
    }

    pub fn current_configuration_version(&self) -> Result<String, reqwest::Error> {
        let response = self
            .client
            .get(
                self.config
                    .api_address("/services/haproxy/configuration/version"),
            )
            .basic_auth("dataplaneapi", Some("mypassword"))
            .send()?
            .text()?;
        Ok(response)
    }
}
