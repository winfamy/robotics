import re
import requests
import hashlib
import time
import os
import json

meet_name = "Grady's Meet"

hash_rankings 	= ''
#hash_matches 	= ''

def parse_rankings(text):
	results = []
	matches = re.findall(r'<TR ALIGN=CENTER><TD BGCOLOR=".+?" ROWSPAN=2>([A-z]+?-[0-9]+?)<\/TD><TD BGCOLOR=".+?" ROWSPAN=2>(?:(\d+?-\d+?) ([R|B])|(&nbsp;))<\/TD><TD BGCOLOR=".+?">(\d+?\*?)<\/TD><TD BGCOLOR="#.+?">(\d+?\*?)<\/TD><\/TR><TR ALIGN=CENTER><TD BGCOLOR=".+?">(\d+?\*?)<\/TD><TD BGCOLOR="#[A-z0-9]+?">(\d+?\*?)<\/TD><\/TR>', text)
	
	for match in matches:
		if (match[3] == '&nbsp;'):
			results.append({
				'match': match[0],
				'result': 'N/A',
				'scores': {
					'red': [ match[4], match[6] ],
					'blue': [ match[5], match[7] ]
				}
			})
		else:
			results.append({
				'match': match[0],
				'result': {
					'score': match[1],
					'winner': match[2]
				},
				'scores': {
					'red': [ match[4], match[6] ],
					'blue': [ match[5], match[7] ]
				}
			})
	
	return results
		
def post_rankings(data):
	requests.post("http://localhost:1337/meet/rankings", data=json.dumps({
		'meet': meet_name,
		'rankings': data
	}))

while(True):
	files = [ f for f in os.listdir( os.curdir ) if os.path.isfile(f) ]
	for file in files:
		if ( re.match(".*?_rankings\.html", file) ):
			file = open(file, 'r')
			text = file.read()
			file.close()
			hashed = hashlib.md5(text).hexdigest()

			if (hashed != hash_rankings):
				hash_rankings = hashed
				print(parse_rankings(text))
				post_rankings(parse_rankings(text))



	time.sleep(30)
