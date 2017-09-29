class Post < ApplicationRecord
  belongs_to :user
  has_one :profile, through: :user

  def self.feed_display
    select('posts.id, posts.user_id, body, posts.created_at, profiles.name')
    .joins('INNER JOIN profiles on profiles.user_id = posts.user_id')
    .order(created_at: :desc)
  end

end
