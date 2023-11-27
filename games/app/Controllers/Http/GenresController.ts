import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class GenresController {
  public async index({response}: HttpContextContract) {
    const genres = await Database
      .query()  // 👈 gives an instance of select query builder
      .from('genres')
      .select('*')

    return response.ok({
      message: "Data Genre",
      data: genres
    })
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {

    const genreVaLidator = schema.create({
            name: schema.string()
        })
        const GenresDataStore= await request.validate({schema: genreVaLidator})

        await Database
            .insertQuery() // 👈 gives an instance of insert query builder
            .table('genres')
            .insert(GenresDataStore)

        
        return response.created({
            message: "Berhasil Menambahkan Data Genres"
        })

  }

  public async show({response, params}: HttpContextContract) {

    const genres = await Database
        .from('genres')
        .where('id', params.id)
        .first()

        return response.ok({
            message: "Tampilkan Data Genre",
            data: genres
        })

  }

  public async edit({}: HttpContextContract) {}

  public async update({request, response, params}: HttpContextContract) {
    const genresValidator = schema.create({
            name: schema.string()
        })
        const GenresDataUpdate= await request.validate({schema: genresValidator})

        await Database
            .from('genres')
            .where('id', params.id)
            .update(GenresDataUpdate);

        return response.created({
            message: "Data Behasil di update"
        })

    }

    public async destroy({ response, params }: HttpContextContract) {
      try {
          await Database
              .from('genres')
              .where('id', params.id)
              .delete();
  
          return response.ok({
              message: 'Genre deleted successfully',
          });
      } catch (error) {
          return response.status(500).send({
              message: 'Failed to delete genre',
              error: error.message,
          });
      }
  }
  


}

