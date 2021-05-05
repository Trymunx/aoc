package inputparser

import (
	"bufio"
	"os"

	"github.com/pkg/errors"
)

type TransformFunc = func(line string) (interface{}, error)

func Parse(fileName string, lineTransform TransformFunc) ([]interface{}, error) {
	inputFile, err := os.Open(fileName)
	if err != nil {
		return nil, errors.Wrapf(err, "Parse: failed to open file")
	}
	defer inputFile.Close()

	scanner := bufio.NewScanner(inputFile)

	var output []interface{}
	for scanner.Scan() {
		transformed, err := lineTransform(scanner.Text())
		if err != nil {
			return nil, errors.Wrapf(err, "failed performing line transformation")
		}
		output = append(output, transformed)
	}

	return output, nil
}
