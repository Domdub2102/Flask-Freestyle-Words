from random_word import RandomWords
import time

r = RandomWords()

while True:
    print(r.get_random_word())
    time.sleep(5)
