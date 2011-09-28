uid = 0
get_uid = () ->
  uid += 1

flatArraysAreEquals = (arr1, arr2) ->
  if arr1.length != arr2.length
    return false
  
  for k, i in arr1
    if arr1[i] != arr2[i]
      return false
      
  true