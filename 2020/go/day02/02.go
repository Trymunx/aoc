package day02

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/pkg/errors"
	"github.com/trymunx/aoc/day01/utils/inputparser"
)

func Part1() (int64, error) {
	input, err := getInput()
	if err != nil {
		return 0, errors.Wrap(err, "getting input")
	}

	var output int64
	for _, line := range input {
		if len(line) != 3 {
			fmt.Printf("day02.Part1: Line length != 3: %v\n", line)
			continue
		}
		quantities := strings.Split(line[0], "-")

		minRequired, err := strconv.ParseInt(quantities[0], 10, 0)
		if err != nil {
			return 0, errors.Wrapf(err, "parsing minRequired in %v", quantities)
		}
		maxRequired, err := strconv.ParseInt(quantities[1], 10, 0)
		if err != nil {
			return 0, errors.Wrapf(err, "parsing maxRequired in %v", quantities)
		}
		requiredChar := line[1]
		password := line[2]

		count := int64(strings.Count(password, requiredChar))
		if count >= minRequired && count <= maxRequired {
			output++
		}
	}
	return output, nil
}

func Part2() (int64, error) {
	input, err := getInput()
	if err != nil {
		return 0, errors.Wrap(err, "getting input")
	}

	var output int64
	for _, line := range input {
		if len(line) != 3 {
			fmt.Printf("day02.Part1: Line length != 3: %v\n", line)
			continue
		}
		indexes := strings.Split(line[0], "-")
		firstIndex, err := strconv.ParseInt(indexes[0], 10, 0)
		if err != nil {
			return 0, errors.Wrapf(err, "parsing firstIndex in %v", indexes)
		}
		secondIndex, err := strconv.ParseInt(indexes[1], 10, 0)
		if err != nil {
			return 0, errors.Wrapf(err, "parsing secondIndex in %v", indexes)
		}
		matchChar := []rune(line[1])[0]
		password := []rune(line[2])

		// 1-indexed array so subtract 1 to get 0-indexed position
		firstIndex = firstIndex - 1
		secondIndex = secondIndex - 1

		existsAtFirst := len(password) > int(firstIndex) && password[firstIndex] == matchChar
		existsAtSecond := len(password) > int(secondIndex) && password[secondIndex] == matchChar

		// Only valid with exactly one of each
		if existsAtFirst && !existsAtSecond || !existsAtFirst && existsAtSecond {
			output++
		}
	}

	return output, nil
}

func getInput() ([][]string, error) {
	inputLines, err := inputparser.Parse("/home/trymunx/dev/aoc/2020/input/02.txt", func(line string) (interface{}, error) {
		parts := strings.Split(line, " ")
		if len(parts) > 2 {
			// Strip colon from e.g. "a:"
			parts[1] = strings.TrimSuffix(parts[1], ":")
		}
		return parts, nil
	})
	if err != nil {
		return nil, errors.Wrap(err, "parsing input")
	}
	input := make([][]string, len(inputLines))
	for i, v := range inputLines {
		input[i] = v.([]string)
	}

	return input, nil
}
