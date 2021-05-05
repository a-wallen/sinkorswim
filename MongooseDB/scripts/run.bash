echo "Searching for typescript files recursively..."
target_files=$( find . -path ./node_modules -prune -false -o -type f -name "*.ts" )
for filename in $target_files; do
	echo "Compiling ${filename}...";
	tsc $filename;
done
echo "Starting Program...\n\n\n"
node AppServer.js