fn main() {
    std::env::set_var("SERVICE_ADDRESS", "http://localhost:5555/v2");

    let config = haproxy_api_client::Config::build().unwrap();
    let client = haproxy_api_client::Client {
        client: reqwest::blocking::Client::new(),
        config,
    };
    let current_version = client.current_configuration_version().unwrap();
    println!("Current configuration version={}", current_version);
}
