OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
    provider :google_oauth2, '569976604919-hmipa5tk1gjat8h4k13pviegsuo7e4fe.apps.googleusercontent.com', 'n7mNyL3kio5Pu5vaBZnGvRvz', {client_options: {ssl: {ca_file: Rails.root.join("cacert.pem").to_s}}}
end

