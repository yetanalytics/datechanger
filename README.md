# xAPI Statement Date Changer

Simple CLI script that updates xAPI Statement timestamps to start at provided date.

There are 3 CLI arguments
1. `date` (Required) - desired timestamp value for most recent xAPI Statement
  * e.g. `"2022-04-12T12:00:00Z"`
3. `sourceFile` (Required) - path to JSON file which contains xAPI Statements to update
  * e.g. `./data/example_data.json`
5. `targetFile` (Optional) - path to JSON file to store updated xAPI Statements in
  * e.g. `./data/example_output_data.json`

An error is thrown when `date` and/or `sourceFile` are not provided.

## Usage

`node datechanger.js "2022-04-12T12:00:00Z" ./data/example_data.json`

- logs updated xAPI Statements to out

`node datechanger.js "2022-04-12T12:00:00Z" ./data/example_data.json ./data/example_output_data.json`

- writes updated xAPI Statements to "example_output_data" JSON file within the data directory
