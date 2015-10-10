from decode import decode
#This is the function that is used to parse the type1 tag.
#The out put is beautifully arrange in a html table friendly format
#
#By Brabeeba Wang
def parseTag(tag):
	#You input what each module, property means in the dictionary
	moduleDict = {"2754": "Module1", "3940": "Module2", "3266": "Module3", "2734": "Module4", "3252": "Module5", "2735": "Module6", "3839": "Module7", "3966":"Module8", "123": "Module9" }
	propertyDict = {"924": "Property1", "3205": "Property2", "1670": "Property3", "1174": "Property4", "846": "Property5", "2643": "Property6", "1573": "Property7", "4467": "Property8", "3872": "Property9", "947": "Property10", "5079": "Property11"}
	
	#to prevent people copy and paste the tag that include line break and white space
	tag = tag.replace('\n', '').replace('\r', '').replace('\n\r', "").replace(' ', "")
	
	#Here this is a toTable function up until module level
	def toTable(string):
		result = []
		#this is a toSubTable function up until property level
		def toSubTable(string):
			#this is a function that change it to table up until value level
			def toObject(string):
				tempObject = {}
				tempObject["Module"] = ""
				tempObject["Property"] = ""
				tempObject["Value"] = string
				return tempObject
			#map the value level function to get a property level function
			valueList = map(toObject, string.split("%2C"))
			return valueList
		
		#split out the property with the value
		propertyValueList = string.split("|")
		#find the first index of : to separate the property
		propertyList = [pro[:pro.find(":")] for pro in propertyValueList]
		#separate the value and use to subtable on it
		valueList = map(toSubTable, [ pro[pro.find(":")+1:] for pro in propertyValueList])
		#go through the list and replace the first object with the property name
		def decodeObject(dictionary):
			dictionary["Value"] = decode(dictionary["Value"])
			return dictionary
		for index in xrange(0, len(propertyList)):
			temp = ""
			if propertyList[index] in propertyDict.keys():
				temp = propertyDict[propertyList[index]]
			#input the human readable meaning
			if propertyList[index] != "":
				valueList[index][0]["Property"] = propertyList[index] + " | " + temp

			if propertyList[index] == "3872":
				valueList[index] = map(decodeObject, valueList[index])
		#concatinate the list
		for value in valueList:
			result += value
		return result
	result = []
	#split it into each module (including property and value)
	toList = tag.split(",")
	#split out module
	moduleList = [ string[:string.find("|")] for string in toList]
	#get every property and value in each module
	modulePropertyList = map(toTable, [string[string.find("|")+1:] for string in toList])

	#for the first row, add its module
	for index in xrange(0, len(moduleList)):
		temp = ""
		if moduleList[index] in moduleDict.keys():
			temp = moduleDict[moduleList[index]]
			#input the human readable meaning
		if moduleList[index] != "":
			modulePropertyList[index][0]["Module"] = moduleList[index] + " | " + temp
	#concatinate the list
	for x in modulePropertyList:
		result += x
	return result
