class User < ApplicationRecord
    has_many :applications

    validates :name, presence: true

end
