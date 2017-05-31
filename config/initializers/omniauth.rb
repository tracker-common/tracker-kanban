OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
    provider :google_oauth2, '569976604919-hmipa5tk1gjat8h4k13pviegsuo7e4fe.apps.googleusercontent.com', 'n7mNyL3kio5Pu5vaBZnGvRvz', {client_options: {ssl: {ca_file: Rails.root.join("cacert.pem").to_s}}}
end


# Rails.application.config.middleware.use OmniAuth::Builder do
#     provider :google_oauth2, '30177331822-8h5uljjh15usiuiponf2b25hl554q8g1.apps.googleusercontent.com', 'YBAhq6B_TLs_H9xpcARt4Cnx', {client_options: {ssl: {ca_file: Rails.root.join("cacert.pem").to_s}}}
# end

