from src.main import app

@app.get("/")
def root():
    return {"message": "Hey"}
    

def handleString(qstring):
  list = qstring.split("&")
  # feed words in elastic search
  return list

@app.get("/search/")
def read_item(qstring: str = "_"):
    print(qstring)
    return {
      "Query": handleString(qstring)
      }


# Query Base:
# http://127.0.0.1:8000/search/?qstring={WORD1}%26{WORD2}