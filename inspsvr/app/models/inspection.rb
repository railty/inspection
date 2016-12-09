class Inspection < ApplicationRecord
  belongs_to :feature, optional: true
  attribute :gps, :point

  def self.load_file(filename)
    str = File.read(filename)

    inspections = JSON.parse(str)
    inspections.each do |inspection|
      self.load(inspection)
    end
  end


  def self.load(hInspection)
      inspection = Inspection.new
      properties = []
      hInspection.each do |k, v|
        if k == 'Feature Key' then
          fno, fid, cno, cid = v['value'].split(/\s*,\s*/)
          puts fid

          fno = fno.to_i
          fid = fid.to_i
          cno = cno.to_i
          cid = cid.to_i

        elsif k == 'User' then
          inspection.inspector = v['value']
        elsif k == 'Updated' then
          inspection.inspected_at = v['value']
        elsif k == 'HEX_STATUS' then
          inspection.status = v['value']
        elsif k == 'Inspect Comment' then
          inspection.comment = v['value']
        elsif k == 'Inspect Comment' then
          inspection.comment = v['value']
        elsif k == 'GPS Position' then
          if v['value'] =~ /(\d+)\D(\d+)\'([\d\.]+)\"N,(\d+)\D(\d+)\'([\d\.]+)\"W/ then
            lat_d = $1.to_i
            lat_m = $2.to_i
            lat_s = $3.to_f
            lng_d = $4.to_i
            lng_m = $5.to_i
            lng_s = $6.to_f
            lat = lat_d + (lat_m + (lat_s / 60.0))/60.0
            lng = lng_d + (lng_m + (lng_s / 60.0))/60.0
            lng = -lng
            inspection.gps = [lat, lng]
          end
        else
          tp = {}
          pairs = v['type'].gsub(/^{/, '').gsub(/}$/, '').split(';')
          pairs.each do |pair|
            l, r = pair.split('=')

            if l =='Type' and ['string', 'boolean'].include?(r) then
              tp['datatype'] = r
            elsif ['Required', 'ReadOnly', 'Visible'].include?(l) then
              tp[r.downcase] = true
            elsif l=='Tab' then
              tp[l.downcase] = r
            elsif l=='Control' and r=='HexMobileControls:HexMobileControls.YesNoSelect' then
              tp['datatype'] = 'boolean'
            elsif l=='Items' then
              tp['items'] = r.split(/\s*,\s*/)
            elsif l =='string' and r == nil then
              #for media file, doesn't seem use anymore
            elsif l =='Ano' then
              #maybe use as ref_id
            elsif l=='Number' and r =='Location' then
              #for feature key, doesn't seem use anymore
            else
              puts "#{k}==>#{l}-->#{r}"
            end
          end
          properties << {name: k, type: tp, value: v['value']}
        end
      end
      inspection.properties = properties
      inspection.save
  end
end
