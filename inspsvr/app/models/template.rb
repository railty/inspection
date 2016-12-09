class Template < ApplicationRecord
  def self.load_file(filename)
    str = File.read(filename)
    self.load(JSON.parse(str))
  end

  def self.load(hTemplates)
    hTemplates.each do |hTemplate|
      template = Template.new
      template.name = hTemplate['name']
      tabs = []
      hTemplate['properties'].each do |k, v|
        t = v['type']
        pairs = t.gsub(/^{/, '').gsub(/}$/, '').split(';')

        property = {'name' => k.gsub(/^\+/, '')}
        p = {}
        pairs.each do |pair|
          l, r = pair.split('=')
          p[l] = r
        end

        if p['Tab'] != nil then
          tab = tabs.find { |tab| tab['name'] == p['Tab'] }
          if tab == nil then
            tab = {'name' => p['Tab'], 'properties' => []}
            tabs << tab
          end

          p.each do |l, r|
            next if l == 'Tab'
            next if l == 'Ano'

            if l == 'Type' then
              property['type'] = r if property['type'] == nil
            elsif ['Required', 'ReadOnly', 'Visible', 'Restricted'].include?(l) then  #Restricted probably are combo cannot edit
                property[l.downcase] = r
            elsif l == 'Items' then
              choices = r.split(',')
              property['choices'] = choices
              property['type'] = 'picklist'
            elsif l == 'Control' and r=='HexMobileControls:HexMobileControls.YesNoSelect' then
              property['type'] = 'boolean'
            elsif l == 'Number' then
              property['id'] = r
            elsif l == 'Picklist' then #Picklist from server?
              property['type'] = 'ticklist'
            else
              puts "unknown #{l}-->#{r}"
            end
          end
          tab['properties'] << property
        end
      end

      template.properties = tabs
      template.save
    end
  end
end
