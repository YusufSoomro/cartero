 #!/bin/bash          

nodemon --watch ../config/ --watch ../bin/www --watch ../init/ --watch ../models/ --watch ../routes/ --watch ../views/ --ext js,json,jade,css --exec "npm run build && npm start"