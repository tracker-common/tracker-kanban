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
    columns.each do |column|
      if column["name"] == new_column
        column["stories"].push(card)
        break
      end
    end
  end

  def findAndDeleteColumn(column_to_delete)
    temp_array = []
    columns.each do |column|
      if column["name"] == column_to_delete
        column["stories"].each do |story|
          temp_array.push(story)
        end
        columns.delete(column)
      end
    end
    return temp_array
  end

  def insertCardSet(card_set)
    translation_states = {unstarted: "READY", rejected: "READY", started:"IN-PROGRESS", delivered: "DELIVERED", finished: "FINISHED", accepted: "DONE"}

      columns.each do |column|
        state = translation_states[card_set[0]["current_state"].to_sym]
        if state == column["name"]
          column["stories"] = column["stories"] + card_set
          break
        end
      end
  end


end
