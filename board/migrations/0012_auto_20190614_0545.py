# Generated by Django 2.2 on 2019-06-14 05:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('board', '0011_auto_20190614_0542'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='post',
            options={'ordering': ['-date_of_created']},
        ),
    ]