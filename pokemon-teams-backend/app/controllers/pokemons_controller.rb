class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: pokemons
    end

    def create
        nickname = Faker::Name.first_name
        species = Faker::Games::Pokemon.name

        pokemon = Pokemon.new(nickname: nickname, species: species, trainer_id: params[:trainer_id])
        if pokemon.save
            render json: pokemon, except: [:created_at, :updated_at]
        else
            render json: {:error 'No pokemon for you'}
        end
    end

    def destroy
        pokemon = Pokemon.find_by_id(params[:id])

        if pokemon
            render json: pokemon, except: [:created_at, :updated_at]
            pokemon.destroy
        else
            render json: {error: 'Invalid Pokemon'}
        end
    end
end
