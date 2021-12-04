const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../build/index.html');
const data = `
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Web Redirection</title>
	</head>
  <body>
    <script>
      window.location = "/pwa/web";
    </script>
	</body>
</html>
`;

fs.writeFileSync(
  filePath,
  data,
  {
    flag: 'w'
  },
  (err) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log('Web Redirection Created.');
  }
);
