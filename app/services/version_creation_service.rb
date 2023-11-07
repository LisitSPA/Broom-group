class VersionCreationService
  attr_reader :errors

  def initialize(params)
    @version_data = params[:versionData]
    @firm_profiles_ids = params[:firmProfilesIds]
    @ownerships = params[:ownerships]
    @errors = []
  end

  def call
    ActiveRecord::Base.transaction do
      # step 1
      # the version is created
      create_version!
      
      # step 2
      # new firms created based on the existing firm profiles
      create_firms!
      
      # step 3
      # the ownerships between the firms are created
      create_ownerships!
    end
    @version
  rescue => e
    @errors << e.message
  end

  private

  def create_version!
    @version = Version.create!(
      title: @version_data[:title],
      description: @version_data[:description],
      simulation: @version_data[:isSimulated],
      version_number: Matrix.find(@version_data[:matrixId]).last_version_number + 1,
      source_file: @version_data[:sourceFile],
      author_id: @version_data[:authorId],
      matrix_id: @version_data[:matrixId],
    )
  end

  def create_firms!
    @firm_profiles_ids.each do |firm_profile_id|
      Firm.create!(
        firm_profile_id: firm_profile_id,
        version_id: @version.id,
      )
    end
  end

  def create_ownerships!
    @ownerships.each do |ownership|
      owner = @version.firms.find_by(firm_profile_id: ownership[:ownerProfileId])
      subsidiary = @version.firms.find_by(firm_profile_id: ownership[:subsidiaryProfileId])

      if owner.nil?
        raise "Owner with profile id #{ownership[:ownerProfileId]} not found for ownership: #{ownership[:ownerProfileId]} - #{ownership[:subsidiaryProfileId]}"
      end

      if subsidiary.nil?
        raise "Subsidiary with profile id #{ownership[:subsidiaryProfileId]} not found for ownership: #{ownership[:ownerProfileId]} - #{ownership[:subsidiaryProfileId]}"
      end

      Ownership.create!(
        owner_id: owner&.id,
        subsidiary_id: subsidiary&.id,
        percentage: ownership[:percentage],
      )
    end
  end
end