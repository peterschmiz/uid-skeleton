helpers do
	def embedded_svg(path)
	    path = File.join('source', images_dir, 'content', path);

		if File.file?(path)
			File.open(path, "r") do |file|
				file.read
			end
		else
			logger.error "File not found: #{path}"
		end

	end
end