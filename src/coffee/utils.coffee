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
  
implements = (classes...) ->
    for klass in classes
        # static properties
        for prop of klass
            @[prop] = klass[prop]
        # prototype properties
        for prop of klass.prototype
            getter = klass::__lookupGetter__(prop)
            setter = klass::__lookupSetter__(prop)

            if getter || setter
                @::__defineGetter__(prop, getter) if getter
                @::__defineSetter__(prop, setter) if setter
            else
                @::[prop] = klass::[prop]
    return this

if Object.defineProperty
    Object.defineProperty Function.prototype, "implements", value : implements
else
    Function::implements = implements