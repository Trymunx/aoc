package day01

import (
	"strconv"

	"github.com/pkg/errors"
	"github.com/trymunx/aoc/day01/utils/inputparser"
)

// Part1 returns the answer to 2020 day 1 part 1
func Part1() (int64, error) {
	input, err := getInput()
	if err != nil {
		return 0, errors.Wrapf(err, "Part1: getting input")
	}

	for i, value := range input {
		complement := 2020 - value
		for j, val := range input {
			if i != j && val == complement {
				return value * val, nil
			}
		}
	}

	return 0, errors.New("Failed to find an answer")
}

func Part2() (int64, error) {
	input, err := getInput()
	if err != nil {
		return 0, errors.Wrapf(err, "Part2: getting input")
	}

	for i, value := range input {
		for j, val := range input {
			if i == j {
				continue
			}
			for k, v := range input {
				if k == j {
					continue
				}
				if value+val+v == 2020 {
					return value * val * v, nil
				}
			}
		}
	}

	return 0, errors.New("Failed to find an answer")
}

func getInput() ([]int64, error) {
	inputLines, err := inputparser.Parse("/home/trymunx/dev/aoc/2020/input/01.txt", func(line string) (interface{}, error) {
		out, err := strconv.ParseInt(line, 10, 0)
		if err != nil {
			return 0, errors.Wrapf(err, "converting line %s to int", line)
		}
		return out, nil
	})
	if err != nil {
		return nil, errors.Wrapf(err, "parsing input")
	}
	input := make([]int64, len(inputLines))
	for i, v := range inputLines {
		input[i] = v.(int64)
	}

	return input, nil
}
