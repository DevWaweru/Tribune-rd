from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=400)
    content = models.TextField()
    date_posted = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ('-id',)
    
    @classmethod
    def get_all(cls):
        articles = Article.objects.all()
        return articles
    
    @classmethod
    def get_single(cls, id):
        article = Article.objects.get(id = id)
        return article
    
    @classmethod
    def get_user_posts(cls, id):
        article = Article.objects.filter(user__pk=id)
        return article