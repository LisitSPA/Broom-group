# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_10_07_200123) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "countries", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "firm_profiles", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.string "rut"
    t.string "sap_code"
    t.bigint "country_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["country_id"], name: "index_firm_profiles_on_country_id"
  end

  create_table "firms", force: :cascade do |t|
    t.boolean "can_own", default: true
    t.boolean "can_be_owned", default: true
    t.bigint "firm_profile_id", null: false
    t.bigint "version_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["firm_profile_id"], name: "index_firms_on_firm_profile_id"
    t.index ["version_id"], name: "index_firms_on_version_id"
  end

  create_table "matrices", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ownerships", force: :cascade do |t|
    t.float "percentage"
    t.bigint "owner_id", null: false
    t.bigint "subsidiary_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["owner_id"], name: "index_ownerships_on_owner_id"
    t.index ["subsidiary_id"], name: "index_ownerships_on_subsidiary_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.boolean "admin"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "versions", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.boolean "simulation", default: false
    t.integer "version_number"
    t.string "source_file"
    t.bigint "author_id", null: false
    t.bigint "matrix_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_versions_on_author_id"
    t.index ["matrix_id"], name: "index_versions_on_matrix_id"
  end

  add_foreign_key "firm_profiles", "countries"
  add_foreign_key "firms", "firm_profiles"
  add_foreign_key "firms", "versions"
  add_foreign_key "ownerships", "firms", column: "owner_id"
  add_foreign_key "ownerships", "firms", column: "subsidiary_id"
  add_foreign_key "versions", "matrices"
  add_foreign_key "versions", "users", column: "author_id"
end
