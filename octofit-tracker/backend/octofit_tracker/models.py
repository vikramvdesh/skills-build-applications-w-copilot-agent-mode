from djongo import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class Team(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)
    class Meta:
        db_table = 'teams'
    def __str__(self):
        return self.name

class FitnessUserManager(BaseUserManager):
    def create_user(self, email, name, team, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(
            email=self.normalize_email(email),
            name=name,
            team=team,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, team, password):
        user = self.create_user(
            email=email,
            name=name,
            team=team,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

class FitnessUser(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='members')
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = FitnessUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'team']

    class Meta:
        db_table = 'users'
    
    def __str__(self):
        return self.name

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin

class Activity(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(FitnessUser, on_delete=models.CASCADE, related_name='activities')
    type = models.CharField(max_length=100)
    duration = models.IntegerField()  # in minutes
    date = models.DateField()
    class Meta:
        db_table = 'activities'
    def __str__(self):
        return f"{self.user.name} - {self.type}"

class Workout(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField()
    suggested_for = models.CharField(max_length=100)
    class Meta:
        db_table = 'workouts'
    def __str__(self):
        return self.name

class Leaderboard(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(FitnessUser, on_delete=models.CASCADE, related_name='leaderboard_entries')
    score = models.IntegerField()
    class Meta:
        db_table = 'leaderboard'
    def __str__(self):
        return f"{self.user.name} - {self.score}"
