# Generated by Django 2.2 on 2019-06-14 05:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('board', '0008_auto_20190614_0533'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='post',
            options={'ordering': ['-date_of_created', '-date_of_modified']},
        ),
    ]
