class OwnersMapService
  def initialize(source_node)
    @source_node = source_node
    @adjacency_list = {}
    @levels = {}
    @cycles = {}
    @final_firms = []
  end

  def call
    level = 1

    if adjacency_list_add(@source_node)
      add_level(@source_node, level)
    end

    investors = @source_node.investors
    while true
      level += 1
      following_investors = []
      investors.each do |investor|
        current_investor = investor.owner
        if adjacency_list_add(current_investor)
          add_level(current_investor, level)

          following_investors += current_investor.investors
        else
          if current_investor.is_final
            add_final_firm(current_investor)
          else
            add_as_cycle(current_investor, level, investors)
          end
        end
      end

      if following_investors.empty?
        break
      end

      investors = following_investors.uniq { |i| i.owner_id }
    end

    return {
      adjacencyList: @adjacency_list,
      cycles: @cycles,
      finalFirms: @final_firms,
      levels: @levels
    }
  end

  private

  def adjacency_list_add(firm)
    if @adjacency_list[firm.id].nil?
      @adjacency_list[firm.id] = firm.investors.map { |i| [i.owner.id, i.percentage] }.to_h || {}
      return true
    end
    return false
  end

  def add_level(firm, level)
    @levels[level] = {} if @levels[level].nil?
    @levels[level][firm.id] = firm.investors.map { |i| i.owner.id }
  end

  def add_as_cycle(firm, level, investors)
    @cycles[level] = {} if @cycles[level].nil?
    @cycles[level][firm.id] = firm.investors.map { |i| [i.owner.id, i.percentage] }.to_h
  end

  def add_final_firm(firm)
    @final_firms << firm.id if !@final_firms.include?(firm.id)
  end
end