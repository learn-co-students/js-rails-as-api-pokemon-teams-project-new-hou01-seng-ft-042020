class Pokemon < ApplicationRecord
  belongs_to :trainer

  validate :trainer_has_space

  def trainer_has_space
    number_of_pokemons = self.trainer.pokemons.size

    if number_of_pokemons >= 6 
      errors.add(:trainer_id, 'cannot handle anymore pokemon')
    end
  end
end
