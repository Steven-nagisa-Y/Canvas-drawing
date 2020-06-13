#!/usr/bin/env python3
# coding=utf-8


def writeFile(name):
    with open(name, 'w') as file:
        for i in range(20):
            file.write(str(i) + " ")
        file.close()


if __name__ == '__main__':
    writeFile("point.txt")