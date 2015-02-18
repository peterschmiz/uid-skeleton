	use Rack::Rewrite do
		# On built in urls
		rewrite %r{(__)(.*)$}, '/$1$2'
		# On empty string (localhost/)
		rewrite %r{\/$}, '/' + template_directory + '/index.html'
		# Modified query string handling
	    rewrite %r{(.*)(livereload|v=|w=|h=|q=|width=|height=|quality=|debug=|jsdebug=)(.*)$}, '$1'
		# Without extension and with parameter (.html)
	    rewrite %r{(.*)(\?)(.*)$(?<!css|png|jpg|gif|ico|js|json|woff|eot|svg|svgz|ttf|html|mp3|mp4|ogg|map)}, '/' + template_directory + '$1.html?$3'
		# Without extension (.html)
	    rewrite %r{(.*)$(?<!css|png|jpg|gif|ico|js|json|woff|eot|svg|svgz|ttf|html|mp3|mp4|ogg|map)}, '/' + template_directory + '$1.html'
	    # With extension (.html)
	    rewrite %r{(.*)$(?<!css|png|jpg|gif|ico|js|json|woff|eot|svg|svgz|ttf|mp3|mp4|ogg|map)}, '/' + template_directory + '$1'
	end