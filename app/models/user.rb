class User
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic 
  field :provider, type: String
  field :uid, type: String
  field :name, type: String
  field :api_token, type: String
  field :oauth_token, type: String
  field :oauth_expires_at, type: Time

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_initialize.tap do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.name
      user.api_token = " "
      user.oauth_token = auth.credentials.token
      user.oauth_expires_at = Time.at(auth.credentials.expires_at)
      user.save!
    end
  end

end
