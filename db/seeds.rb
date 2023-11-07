countries = ["Afganistán", "Albania", "Alemania", "Andorra", "Angola", "Antigua y Barbuda", "Arabia Saudita", "Argelia", "Argentina", "Armenia", "Australia", "Austria", "Azerbaiyán", "Bahamas", "Bahréin", "Bangladés", "Barbados", "Bielorrusia", "Bélgica", "Belice", "Benín", "Bután", "Bolivia", "Bosnia-Herzegovina", "Botsuana", "Brasil", "Brunéi", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Camboya", "Camerún", "Canadá", "Chad", "República Checa", "Chequia", "Chile", "China", "Chipre", "Colombia", "Comoras", "Congo", "República Democrática del Congo", "Corea del Norte", "Corea del Sur", "Costa Rica", "Costa de Marfil", "Croacia", "Cuba", "Dinamarca", "Yibuti", "Dominica", "Ecuador", "Egipto", "El Salvador", "Emiratos Árabes Unidos", "Eritrea", "Eslovaquia", "Eslovenia", "España", "Estados Unidos", "Estonia", "Etiopía", "Fiyi", "Filipinas", "Finlandia", "Francia", "Gabón", "Gambia", "Georgia", "Ghana", "Granada", "Grecia", "Guatemala", "Guinea", "Guinea-Bissau", "Guinea Ecuatorial", "Guyana", "Haití", "Honduras", "Hungría", "India", "Indonesia", "Irán", "Iraq", "Irlanda", "Islandia", "Israel", "Italia", "Jamaica", "Japón", "Jordania", "Kazajistán", "Kenia", "Kirguistán", "Kiribati", "Kuwait", "Laos", "Lesoto", "Letonia", "Líbano", "Liberia", "Libia", "Liechtenstein", "Lituania", "Luxemburgo", "Macedonia", "Madagascar", "Malasia", "Malaui", "Maldivas", "Mali / Malí", "Malta", "Marruecos", "Islas Marshall", "Mauricio", "Mauritania", "México", "Micronesia", "Moldavia", "Mónaco", "Mongolia", "Montenegro", "Mozambique", "Birmania", "Namibia", "Nauru", "Nepal", "Nicaragua", "Níger", "Nigeria", "Noruega", "Nueva Zelanda", "Omán", "Países Bajos", "Pakistán", "Palaos", "Panamá", "Papúa Nueva Guinea", "Paraguay", "Perú", "Polonia", "Portugal", "Qatar", "Reino Unido", "República Centroafricana", "República Dominicana", "Rumanía / Rumania", "Rusia", "Ruanda", "San Cristóbal y Nieves", "Islas Salomón", "Samoa", "San Marino", "Santa Lucía", "Ciudad del Vaticano", "Santo Tomé y Príncipe", "San Vicente y las Granadinas", "Senegal", "Serbia", "Seychelles", "Sierra Leona", "Singapur", "Siria", "Somalia", "Sri Lanka", "Sudáfrica", "Sudán", "Sudán del Sur", "Suecia", "Suiza", "Surinam", "Suazilandia", "Tailandia", "Tanzania", "Tayikistán", "Timor Oriental", "Togo", "Tonga", "Trinidad y Tobago", "Túnez", "Turkmenistán", "Turquía", "Tuvalu", "Ucrania", "Uganda", "Uruguay", "Uzbekistán", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabue"]

countries.each do |country|
  Country.create(name: country)
end

admin = User.create(
  email: "admin@email.com",
  password: "lisit123*",
  password_confirmation: "lisit123*",
  admin: true,
)

abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

abc.each_char do |letter|
  FirmProfile.create(
    title: letter,
    rut: Faker::ChileRut.full_rut,
    country: Country.all.sample,
  )
end

matrix_1 = Matrix.create(title: "Matrix", description: "Matrix 1")
version_1 = Version.create(
  title: "Version 1",
  description: "Version 1",
  matrix: matrix_1,
  author: admin
)

FirmProfile.all.each do |firm_profile|
  Firm.create(
    firm_profile: firm_profile,
    version: version_1,
  )
end

a = Firm.find_by(firm_profile: FirmProfile.find_by(title: "A"))
b = Firm.find_by(firm_profile: FirmProfile.find_by(title: "B"))
c = Firm.find_by(firm_profile: FirmProfile.find_by(title: "C"))
d = Firm.find_by(firm_profile: FirmProfile.find_by(title: "D"))
e = Firm.find_by(firm_profile: FirmProfile.find_by(title: "E"))

x = Firm.find_by(firm_profile: FirmProfile.find_by(title: "X"))

Ownership.create(
  owner: a,
  subsidiary: b,
  percentage: rand(1..100),
)
Ownership.create(
  owner: a,
  subsidiary: d,
  percentage: rand(1..100),
)
Ownership.create(
  owner: b,
  subsidiary: c,
  percentage: rand(1..100),
)
Ownership.create(
  owner: c,
  subsidiary: e,
  percentage: rand(1..100),
)
Ownership.create(
  owner: d,
  subsidiary: c,
  percentage: rand(1..100),
)
Ownership.create(
  owner: d,
  subsidiary: x,
  percentage: rand(1..100),
)
Ownership.create(
  owner: e,
  subsidiary: d,
  percentage: rand(1..100),
)
Ownership.create(
  owner: e,
  subsidiary: x,
  percentage: rand(1..100),
)