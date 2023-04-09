# Performance

Performance can be a lot of things such as Startup time and Runtime Performance. 

## Startup Time

This is affected by script size and the number of Http Roundtrips (caused by non-bundled code and third party library CDNs )

## Runtime

- Unnecesary DOM Operations can slow things down. So this should be minimized. 
- Memory Leaks can also be detrimental. They can crash your application and will slow it down in all cases. 

# Lazy-loading

Lazy-loading can be used to increase performance by only importing scripts when they are needed. 