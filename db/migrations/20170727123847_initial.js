exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('order-history', function(table) {
      table.increments('id').primary()
      table.string('total')
      table.timestamps(true, true)
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('order-history'),
  ])
}
