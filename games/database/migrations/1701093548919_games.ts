import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'games'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id'),
      table.string("title"),
      table.text("gameplay"),
      table.dateTime("release_date")
      table
      .integer('genre_id')
      .unsigned()
      .references('id')
      .inTable('genre')
      .onDelete('CASCADE');

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
