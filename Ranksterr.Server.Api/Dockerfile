# Use the .NET SDK image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copy the published output from the build stage
COPY --from=build-env /app/out .

# Expose port if needed (optional)
EXPOSE 5000

# Set the entrypoint
ENTRYPOINT ["dotnet", "Ranksterr.Server.Api.dll"]
