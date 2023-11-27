import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class GamesController {
  public async index({response}: HttpContextContract) {
    const games = await Database
    .query()  // 👈 gives an instance of select query builder
    .from('games')
    .select('*')

  return response.ok({
    message: "Data games",
    data: games
    })
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const gamesValidator = schema.create({
        title: schema.string(),
        gameplay: schema.string(),
        release_date: schema.date({
          format: 'yyyy-MM-dd',
        }),
        genre_id: schema.number([
            rules.exists({ table: 'genre', column: 'id' }) // Perubahan pada penamaan tabel
        ])
    });

    try {
        const gamesData = await request.validate({ schema: gamesValidator });

        await Database
            .table('games')
            .insert(gamesData);

        return response.created({
            message: "Berhasil menambahkan data"
        });
    } catch (error) {
        return response.status(500).send({
            message: "Gagal menambahkan data",
            error: error.message
        });
    }
}

  public async show({response, params}: HttpContextContract) {
    const games= await Database
        .from('games')
        .where('id', params.id)
        .first()

        return response.ok({
            message: "Tampilkan Data",
            data: games
        })
  }

  public async edit({}: HttpContextContract) {}

  public async update({request, response, params}: HttpContextContract) {

    const gamesValidator = schema.create({
      title: schema.string(),
      gameplay: schema.string(),
      release_date: schema.date(),
      genre_id : schema.number([
        rules.exists({table: 'genre', column:'id'})
      ])
    })

    const gamesData = await request.validate({schema: gamesValidator})
    await Database
            .from('categories')
            .where('id', params.id)
            .update(gamesData);

        return response.created({
            message: "Data Behasil di update"
        })
  }

  public async destroy({response, params}: HttpContextContract) {
    await Database
            .from('books')
            .where('id', params.id)
            .delete();

  
        return response.ok({
            message: "Berhasil"
 
        })
  }
}
