# Generated by Django 3.0.5 on 2020-04-27 15:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rider', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ride',
            name='complete',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='ride',
            name='status',
            field=models.BooleanField(default=False),
        ),
    ]
