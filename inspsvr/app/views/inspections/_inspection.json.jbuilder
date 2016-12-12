json.extract! inspection, :id, :created_at, :updated_at, :inspector
json.location inspection.properties[0]['value']
json.url inspection_url(inspection, format: :json)
