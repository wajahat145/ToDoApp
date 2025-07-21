var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevelopmentCors",
        policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

    options.AddPolicy("ProductionCors", policy =>
    {
        policy.WithOrigins("https://example.com") // add prod domain here
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("DevelopmentCors");
}
else
{
    app.UseCors("ProductionCors");
}

    app.UseAuthorization();
app.MapControllers();
app.Run();
