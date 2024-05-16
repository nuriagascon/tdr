module Jekyll
  class CustomPermalink < Generator
    safe true
    priority :low

    def generate(site)
      site.collections.each do |name, collection|
        collection.docs.each do |doc|
          custom_title = doc.data['title']
          slugified_title = Jekyll::Utils.slugify(custom_title)
          doc.data['permalink'] = "/#{slugified_title}/"
        end
      end
    end
  end
end
