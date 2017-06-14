class Project
  include Mongoid::Document
  field :name, type: String
  field :id, type: Integer
  field :columns, type: Array



  def findAndDeleteStoryID(old_column, story_id)

    card = {}
    columns.each do |column|
      if column["name"] == old_column
        column["stories"].each do |story|
          puts "story :#{story["id"]}"
          if story["id"].to_i == story_id.to_i
            card = story
            column["stories"].delete(story)
            break
          end
        end
      end
    end
    return card
  end



  def insertCard(new_column, card)
    puts "BEFORE: #{columns}"
    columns.each do |column|
      if column["name"] == new_column
        column["stories"].push(card)
        break
      end
    end
    puts "AFTER: #{columns}"
  end


end
